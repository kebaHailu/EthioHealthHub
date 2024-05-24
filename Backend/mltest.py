import os
from tensorflow.keras.models import load_model
import numpy as np
import cv2


def predict_with_eye_model():
    new_image_path = 'media/images/1063_right.jpg'
    new_image = cv2.imread(new_image_path, cv2.IMREAD_COLOR)
    processed_image = cv2.resize(new_image, (224, 224))
    # processed_image = new_image / 255.0

    # access and load the model
    # model_path = os.path.join(settings.MEDIA_ROOT, 'models', 'eye_model.h5')
    model = load_model('media/models/eye_model.h5')

    # access the preprocessed model
    # processed_image = preprocess_image_for_eye(image)

    # perform inference
    predictions = model.predict(np.expand_dims(processed_image, axis=0))
    predicted_class = np.argmax(predictions)
    class_labels = ["Normal", "Cataract", "Diabetes", "Glaucoma", "Hypertension", "Myopia", "Age Issues", "Other"]
    pred_label = class_labels[predicted_class]
    print(pred_label)

    return predictions


print(predict_with_eye_model())