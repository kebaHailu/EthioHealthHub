import os
from tensorflow.keras.models import load_model
from tensorflow.keras.layers import BatchNormalization
from django.conf import settings
import numpy as np
import cv2

def preprocess_image_for_eye(image):
    # Resize the image to match the input size required by the model
    image_size = 224
    new_image = cv2.imdecode(np.fromstring(image.read(), np.uint8), cv2.IMREAD_COLOR)
    new_image = cv2.resize(new_image, (image_size, image_size))
    new_image = new_image.astype(np.float32)
    return new_image
def predict_with_eye_model(image):

    # access and load the model
    model_path = os.path.join(settings.MEDIA_ROOT, 'models', 'eye_model.h5')
    model = load_model(model_path)

    # access the preprocessed model
    processed_image = preprocess_image_for_eye(image)

    # perform inference
    predictions = model.predict(np.expand_dims(processed_image, axis=0))
    predicted_classes = np.argsort(predictions[0])[::-1][:3]  # Get indices of top 3 classes

    class_labels = ["Normal", "Cataract", "Diabetes", "Glaucoma", "Hypertension", "Myopia", "Age Issues", "Other"]

    top_predictions = []
    for class_index in predicted_classes:
        class_label = class_labels[class_index]
        probability = predictions[0][class_index]
        top_predictions.append((class_label, probability))

    ans = ''
    for class_label, probability in top_predictions:
        ans += class_label + ': ' + str(probability*100) + '%, '
        print(f"Class: {class_label}, Probability: {probability}")

    return ans, round(top_predictions[0][1]*100, 2)
#### SKIN ####
def preprocess_image_for_skin(image):
    # Resize the image to match the input size required by the model
    image_size = 224
    new_image = cv2.imdecode(np.fromstring(image.read(), np.uint8), cv2.IMREAD_COLOR)
    new_image = cv2.resize(new_image, (image_size, image_size))
    new_image = new_image.astype(np.float32)
    return new_image


def predict_with_skin_model(image):
    # access and load the model
    model_path = os.path.join(settings.MEDIA_ROOT, 'models', 'skin_model.h5')
    model = load_model(model_path)

    # access the preprocessed model
    processed_image = preprocess_image_for_skin(image)

    # perform inference
    predictions = model.predict(np.expand_dims(processed_image, axis=0))
    predicted_classes = np.argsort(predictions[0])[::-1][:3]  # Get indices of top 3 classes

    class_labels = ['Melanocytic nevi', 'Melanoma', 'Benign keratosis-like lesions ', 'Basal cell carcinoma', 'Actinic keratoses', 'Vascular lesions', 'Dermatofibroma']

    top_predictions = []
    for class_index in predicted_classes:
        class_label = class_labels[class_index]
        probability = predictions[0][class_index]
        top_predictions.append((class_label, probability))

    ans = ''
    for class_label, probability in top_predictions:
        ans += class_label + ': ' + str(probability * 100) + '%, '
        print(f"Class: {class_label}, Probability: {probability}")

    return ans, round(top_predictions[0][1] * 100, 2)

