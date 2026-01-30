import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/FormField';
import { RiskGauge } from './RiskGauge';
import { 
  Baby, 
  Droplets, 
  Heart, 
  Ruler, 
  Syringe, 
  Scale, 
  Dna, 
  Calendar,
  Activity,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FormData {
  pregnancies: string;
  glucose: string;
  blood_pressure: string;
  skin_thickness: string;
  insulin: string;
  bmi: string;
  dpf: string;
  age: string;
}

interface PredictionResult {
  probability: number;
  prediction: number;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export function DiabetesForm() {
  const [formData, setFormData] = useState<FormData>({
    pregnancies: '',
    glucose: '',
    blood_pressure: '',
    skin_thickness: '',
    insulin: '',
    bmi: '',
    dpf: '',
    age: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.pregnancies) newErrors.pregnancies = 'Champ requis';
    if (!formData.glucose) newErrors.glucose = 'Champ requis';
    else if (Number(formData.glucose) < 0 || Number(formData.glucose) > 300) 
      newErrors.glucose = 'Valeur entre 0 et 300';
    
    if (!formData.blood_pressure) newErrors.blood_pressure = 'Champ requis';
    else if (Number(formData.blood_pressure) < 0 || Number(formData.blood_pressure) > 200)
      newErrors.blood_pressure = 'Valeur entre 0 et 200';
    
    if (!formData.skin_thickness) newErrors.skin_thickness = 'Champ requis';
    if (!formData.insulin) newErrors.insulin = 'Champ requis';
    
    if (!formData.bmi) newErrors.bmi = 'Champ requis';
    else if (Number(formData.bmi) < 10 || Number(formData.bmi) > 70)
      newErrors.bmi = 'Valeur entre 10 et 70';
    
    if (!formData.dpf) newErrors.dpf = 'Champ requis';
    else if (Number(formData.dpf) < 0 || Number(formData.dpf) > 2.5)
      newErrors.dpf = 'Valeur entre 0 et 2.5';
    
    if (!formData.age) newErrors.age = 'Champ requis';
    else if (Number(formData.age) < 18 || Number(formData.age) > 120)
      newErrors.age = 'Âge entre 18 et 120';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    setResult(null);

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const payload = {
        pregnancies: Number(formData.pregnancies),
        glucose: Number(formData.glucose),
        blood_pressure: Number(formData.blood_pressure),
        skin_thickness: Number(formData.skin_thickness),
        insulin: Number(formData.insulin),
        bmi: Number(formData.bmi),
        dpf: Number(formData.dpf),
        age: Number(formData.age),
      };

      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Erreur serveur: ${response.status}`);
      }

      const data = await response.json();
      setResult({
        probability: data.probability ?? data.risk_probability ?? 0.5,
        prediction: data.prediction ?? data.result ?? 0,
      });
    } catch (error) {
      console.error('API Error:', error);
      setApiError(
        "Impossible de contacter le serveur d'analyse. Vérifiez que l'API est accessible."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = (field: keyof FormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Form Card */}
      <div className="bg-card rounded-2xl shadow-card p-6 md:p-8 border border-border">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField
              id="pregnancies"
              label="Grossesses"
              icon={<Baby size={18} />}
              value={formData.pregnancies}
              onChange={updateField('pregnancies')}
              placeholder="0"
              min={0}
              max={20}
              step={1}
              error={errors.pregnancies}
            />

            <FormField
              id="glucose"
              label="Glucose"
              icon={<Droplets size={18} />}
              value={formData.glucose}
              onChange={updateField('glucose')}
              placeholder="120"
              unit="mg/dL"
              min={0}
              max={300}
              error={errors.glucose}
            />

            <FormField
              id="blood_pressure"
              label="Pression Artérielle"
              icon={<Heart size={18} />}
              value={formData.blood_pressure}
              onChange={updateField('blood_pressure')}
              placeholder="80"
              unit="mmHg"
              min={0}
              max={200}
              error={errors.blood_pressure}
            />

            <FormField
              id="skin_thickness"
              label="Épaisseur de la peau"
              icon={<Ruler size={18} />}
              value={formData.skin_thickness}
              onChange={updateField('skin_thickness')}
              placeholder="20"
              unit="mm"
              min={0}
              max={100}
              error={errors.skin_thickness}
            />

            <FormField
              id="insulin"
              label="Insuline"
              icon={<Syringe size={18} />}
              value={formData.insulin}
              onChange={updateField('insulin')}
              placeholder="80"
              unit="μU/mL"
              min={0}
              max={900}
              error={errors.insulin}
            />

            <FormField
              id="bmi"
              label="IMC"
              icon={<Scale size={18} />}
              value={formData.bmi}
              onChange={updateField('bmi')}
              placeholder="25.0"
              unit="kg/m²"
              min={10}
              max={70}
              step={0.1}
              error={errors.bmi}
            />

            <FormField
              id="dpf"
              label="Fonction Pedigree"
              icon={<Dna size={18} />}
              value={formData.dpf}
              onChange={updateField('dpf')}
              placeholder="0.5"
              min={0}
              max={2.5}
              step={0.01}
              error={errors.dpf}
            />

            <FormField
              id="age"
              label="Âge"
              icon={<Calendar size={18} />}
              value={formData.age}
              onChange={updateField('age')}
              placeholder="35"
              unit="ans"
              min={18}
              max={120}
              error={errors.age}
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className={cn(
              "w-full h-14 text-lg font-semibold rounded-xl",
              "bg-primary hover:bg-primary/90 text-primary-foreground",
              "shadow-button hover:shadow-lg transition-all duration-300",
              "disabled:opacity-70 disabled:cursor-not-allowed"
            )}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyse en cours...
              </>
            ) : (
              <>
                <Activity className="mr-2 h-5 w-5" />
                Analyser les risques
              </>
            )}
          </Button>
        </form>
      </div>

      {/* Error Message */}
      {apiError && (
        <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4 flex items-start gap-3 animate-slide-up">
          <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-destructive">Erreur de connexion</p>
            <p className="text-sm text-destructive/80 mt-1">{apiError}</p>
          </div>
        </div>
      )}

      {/* Result Card */}
      {result && (
        <div className="bg-card rounded-2xl shadow-result p-6 md:p-8 border border-border animate-scale-in">
          <h2 className="text-xl font-semibold text-center text-foreground mb-6">
            Résultat de l'Analyse
          </h2>
          <RiskGauge probability={result.probability} />
          <p className="text-center text-sm text-muted-foreground mt-6">
            Cette estimation est basée sur un modèle d'apprentissage automatique.
            Consultez un professionnel de santé pour un diagnostic médical.
          </p>
        </div>
      )}
    </div>
  );
}
