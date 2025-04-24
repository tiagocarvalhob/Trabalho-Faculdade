import os
from PIL import Image
import numpy as np
import tensorflow as tf
import streamlit as st

# Carregar o modelo
model = tf.keras.models.load_model('caminho/do/seu/modelo.h5')

# Função para carregar e pré-processar a imagem
def preprocess_image(image):
    image = image.resize((224, 224))  # Ajuste o tamanho conforme necessário para seu modelo
    image_array = np.array(image)
    image_array = np.expand_dims(image_array, axis=0)
    image_array = image_array / 255.0  # Normalização, se necessário
    return image_array

# Função para exibir a imagem e fazer a previsão
def predict_image(image):
    processed_image = preprocess_image(image)
    prediction = model.predict(processed_image)
    return prediction

# Interface do Streamlit para carregar imagens
st.title('Previsão de Imagens')
uploaded_image = st.file_uploader("Escolha uma imagem", type=['jpg', 'png', 'jpeg'])

if uploaded_image is not None:
    image = Image.open(uploaded_image)
    
    # Exibe a imagem carregada
    st.image(image, caption='Imagem Carregada', use_column_width=True)

    # Chama a função de previsão
    prediction = predict_image(image)
    
    # Exibe a previsão (ajuste conforme a saída do seu modelo)
    st.write("Previsão:", prediction)

# Exemplo de como salvar uma imagem caso queira fazer algo com o arquivo carregado
if uploaded_image is not None:
    # Salvar a imagem no diretório
    with open(os.path.join('caminho/destino', uploaded_image.name), 'wb') as f:
        f.write(uploaded_image.getbuffer())
    st.write(f"Imagem salva como {uploaded_image.name}")