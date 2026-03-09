# Diabetes Prediction API

<div align="center">

[![GitHub stars](https://img.shields.io/github/stars/OthmaneAbder2303/diabetes-prediction-api?style=for-the-badge)](https://github.com/OthmaneAbder2303/diabetes-prediction-api/stargazers)

[![GitHub forks](https://img.shields.io/github/forks/OthmaneAbder2303/diabetes-prediction-api?style=for-the-badge)](https://github.com/OthmaneAbder2303/diabetes-prediction-api/network)

**A RESTful API for predicting diabetes using DL, built with Flask.**

</div>

## Overview

This project provides a robust and easy-to-use RESTful API for predicting the onset of diabetes based on diagnostic measurements. Leveraging the Pima Indian Diabetes Dataset, a machine learning model is trained and exposed via a Flask application. The API allows users to send patient data as JSON and receive a prediction (diabetic or non-diabetic).

The core of this project involves:
*   **Data Preprocessing**: Handling the raw `diabetes_pima.csv` dataset.
*   **Model Training & Hyperparameter Tuning**: Utilizing a Jupyter notebook (`hp_tuning.ipynb`) to train and optimize a machine learning model.
*   **API Development**: Creating a Flask application (`app.py`) to serve the trained model predictions.

## Features

-   **Accurate Diabetes Prediction**: Utilizes a pre-trained machine learning model to predict diabetes based on various health indicators.
-   **RESTful API Endpoint**: Simple HTTP POST request for prediction, returning a clear result.
-   **Machine Learning Workflow**: Includes a Jupyter notebook for model training, evaluation, and hyperparameter tuning.
-   **Pythonic & Scalable**: Built with Flask and designed for easy deployment using WSGI servers like Gunicorn.

## Tech Stack

**Backend:**
-   **Python** [![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
-   **Flask** [![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
-   **Scikit-learn** [![Scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)](https://scikit-learn.org/)
-   **Pandas** [![Pandas](https://img.shields.io/badge/pandas-150458?style=for-the-badge&logo=pandas&logoColor=white)](https://pandas.pydata.org/)
-   **NumPy** [![NumPy](https://img.shields.io/badge/numpy-013243?style=for-the-badge&logo=numpy&logoColor=white)](https://numpy.org/)
-   **Joblib** [![Joblib](https://img.shields.io/badge/joblib-yellow?style=for-the-badge)](https://joblib.readthedocs.io/en/latest/)

**Development & Data Science:**
-   **Jupyter Notebook** [![Jupyter Notebook](https://img.shields.io/badge/Jupyter-F37626?style=for-the-badge&logo=jupyter&logoColor=white)](https://jupyter.org/)

**Deployment:**
-   **Gunicorn** [![Gunicorn](https://img.shields.io/badge/Gunicorn-499848?style=for-the-badge&logo=gunicorn&logoColor=white)](https://gunicorn.org/)

## Quick Start

Follow these steps to get the Diabetes Prediction API up and running on your local machine.

### Prerequisites
-   **Python 3.8+** (recommended)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/OthmaneAbder2303/diabetes-prediction-api.git
    cd diabetes-prediction-api
    ```

2.  **Install dependencies**
    ```bash
    pip install -r requirements.txt
    ```

3.  **Train the Machine Learning Model**
    The API requires a pre-trained model file. You need to run the Jupyter notebook `hp_tuning.ipynb` to train the model and save it.
    ```bash
    # Ensure jupyter is installed (e.g., pip install jupyter)
    jupyter notebook hp_tuning.ipynb
    ```
    Execute all cells in `hp_tuning.ipynb`. This notebook will load `diabetes_pima.csv`, preprocess the data, train a model (e.g., Logistic Regression or SVC), perform hyperparameter tuning, and save the best model to `model.joblib` in the project root.

### Running the API

1.  **Start development server**
    Once the `model.joblib` file is generated, you can start the Flask development server:
    ```bash
    python app.py
    ```
    The API will be accessible at `http://127.0.0.1:5000`.

2.  **Test the API**
    You can test the prediction endpoint using `curl` or any API client.

    **Request:**
    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -d '{
             "Pregnancies": 6,
             "Glucose": 148,
             "BloodPressure": 72,
             "SkinThickness": 35,
             "Insulin": 0,
             "BMI": 33.6,
             "DiabetesPedigreeFunction": 0.627,
             "Age": 50
         }' \
         http://127.0.0.1:5000/predict
    ```

    **Response (example):**
    ```json
    {
        "prediction": 1
    }
    ```
    (`1` typically means diabetic, `0` means non-diabetic)

## Project Structure

```
diabetes-prediction-api/
├── .gitignore               # Specifies intentionally untracked files to ignore
├── README.md                # Project README file
├── app.py                   # Main Flask application for the API
├── diabetes_pima.csv        # Dataset used for training the ML model
├── hp_tuning.ipynb          # Jupyter Notebook for ML model training and hyperparameter tuning
├── requirements.txt         # Python dependencies for the project
└── model.joblib             # (Generated by hp_tuning.ipynb) The pre-trained machine learning model
```

## Configuration

The API does not use an external configuration file for simplicity.
-   **Port**: By default, the Flask development server runs on `http://127.0.0.1:5000`. This can be changed in `app.py` if needed.
-   **Model File**: The API expects `model.joblib` to be present in the root directory.

## Development

### Model Development Workflow
1.  Ensure all dependencies are installed (`pip install -r requirements.txt`).
2.  Open and run `hp_tuning.ipynb` in Jupyter Notebook. Experiment with different models, preprocessing steps, and hyperparameter tuning techniques.
3.  After training, save the best performing model using `joblib.dump()` to `model.joblib`.
4.  The `app.py` will automatically load the updated `model.joblib` on startup.

## Deployment

For production deployments, it's recommended to use a WSGI HTTP server like Gunicorn with a reverse proxy (e.g., Nginx or Apache).

### Using Gunicorn
1.  Ensure Gunicorn is installed (included in `requirements.txt`).
2.  Run the API using Gunicorn:
    ```bash
    gunicorn --workers 4 --bind 0.0.0.0:5000 app:app
    ```
    This command starts Gunicorn with 4 worker processes, binding to all network interfaces on port 5000, and serving the `app` Flask instance from `app.py`.

## API Reference

The API exposes a single endpoint for making predictions.

### `/predict` (POST)

Predicts whether a person is diabetic based on input health parameters.

**Endpoint:** `POST /predict`

**Request Body:**
Expects a JSON object with the following parameters:

| Parameter                | Type    | Description                                   | Example | Required |

|--------------------------|---------|-----------------------------------------------|---------|----------|

| `Pregnancies`            | Integer | Number of times pregnant                      | 6       | Yes      |

| `Glucose`                | Integer | Plasma glucose concentration a 2 hours in an oral glucose tolerance test | 148     | Yes      |

| `BloodPressure`          | Integer | Diastolic blood pressure (mm Hg)              | 72      | Yes      |

| `SkinThickness`          | Integer | Triceps skin fold thickness (mm)              | 35      | Yes      |

| `Insulin`                | Integer | 2-Hour serum insulin (mu U/ml)                | 0       | Yes      |

| `BMI`                    | Float   | Body mass index (weight in kg/(height in m)^2)| 33.6    | Yes      |

| `DiabetesPedigreeFunction` | Float   | Diabetes pedigree function                    | 0.627   | Yes      |

| `Age`                    | Integer | Age (years)                                   | 50      | Yes      |

**Example Request:**
```json
{
    "Pregnancies": 6,
    "Glucose": 148,
    "BloodPressure": 72,
    "SkinThickness": 35,
    "Insulin": 0,
    "BMI": 33.6,
    "DiabetesPedigreeFunction": 0.627,
    "Age": 50
}
```

**Response:**
Returns a JSON object containing the prediction.

| Parameter   | Type    | Description                                    |

|-------------|---------|------------------------------------------------|

| `prediction`| Integer | `1` if diabetic, `0` if non-diabetic           |

**Example Success Response:**
```json
{
    "prediction": 1
}
```

**Example Error Response (if input data is invalid):**
```json
{
    "error": "Invalid input data. Please provide all required parameters."
}
```

## Contributing

We welcome contributions! If you have suggestions for improvements, bug fixes, or new features, please feel free to:
1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourFeature`).
3.  Make your changes and commit them (`git commit -m 'Add Your Feature'`).
4.  Push to the branch (`git push origin feature/YourFeature`).
5.  Open a Pull Request.



**⭐ Star this repo if you find it helpful!**

Made with ❤️ by [OthmaneAbder2303](https://github.com/OthmaneAbder2303)

</div>

