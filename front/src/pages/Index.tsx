import { DiabetesForm } from '@/components/DiabetesForm';
import { Activity, Shield } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">DiabeteCheck</h1>
              <p className="text-xs text-muted-foreground">Évaluation du risque diabétique</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-sm text-secondary-foreground mb-4">
            <Shield className="h-4 w-4" />
            Basé sur le Pima Indian Diabetes Dataset
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Évaluez votre risque de diabète
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Remplissez les informations ci-dessous pour obtenir une estimation 
            de votre risque de diabète de type 2 basée sur des indicateurs cliniques.
          </p>
        </div>

        {/* Form */}
        <DiabetesForm />

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          <div className="bg-card rounded-xl p-5 border border-border">
            <div className="p-2 bg-primary/10 rounded-lg w-fit mb-3">
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Analyse rapide</h3>
            <p className="text-sm text-muted-foreground">
              Obtenez une estimation en quelques secondes grâce à notre modèle d'IA.
            </p>
          </div>
          
          <div className="bg-card rounded-xl p-5 border border-border">
            <div className="p-2 bg-success/10 rounded-lg w-fit mb-3">
              <Shield className="h-5 w-5 text-success" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Données sécurisées</h3>
            <p className="text-sm text-muted-foreground">
              Vos informations ne sont pas stockées et restent confidentielles.
            </p>
          </div>
          
          <div className="bg-card rounded-xl p-5 border border-border">
            <div className="p-2 bg-warning/10 rounded-lg w-fit mb-3">
              <Activity className="h-5 w-5 text-warning" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Outil informatif</h3>
            <p className="text-sm text-muted-foreground">
              Cette évaluation ne remplace pas une consultation médicale.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 DiabeteCheck · Outil d'évaluation basé sur l'apprentissage automatique
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
