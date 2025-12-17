import React, { useState } from 'react';
import axios from 'axios';
import Button from '../ui/Button';

const ObjectDetectionCard = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [resultUrl, setResultUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setResultUrl(null); // Clear previous result
            setError('');
        }
    };

    const handleSubmit = async () => {
        if (!selectedFile) {
            setError('Por favor, selecciona una imagen primero.');
            return;
        }

        setLoading(true);
        setError('');
        setResultUrl(null);

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await axios.post('/api/detect/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                responseType: 'blob', // Important: expect a binary response
            });

            // Create a URL from the returned blob
            const imageUrl = URL.createObjectURL(response.data);
            setResultUrl(imageUrl);

        } catch (err) {
            console.error("Error during object detection:", err);
            const errorMsg = err.response?.data?.error || 'Ocurrió un error al procesar la imagen.';
            setError(`Error: ${errorMsg}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Análisis de Imagen con IA</h2>
            <p className="text-gray-600 mb-6">
                Sube una imagen para detectar objetos de interés. El sistema analizará la imagen
                y devolverá el resultado con las detecciones marcadas.
            </p>

            {/* File Input */}
            <div className="mb-6">
                <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-2">
                    Seleccionar Imagen
                </label>
                <input
                    id="image-upload"
                    type="file"
                    accept="image/jpeg, image/png"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
            </div>

            {/* Submit Button */}
            <div className="text-center mb-6">
                <Button onClick={handleSubmit} disabled={loading || !selectedFile}>
                    {loading ? 'Analizando...' : 'Analizar Imagen'}
                </Button>
            </div>

            {/* Error Message */}
            {error && (
                <div className="my-4 text-center text-red-600 bg-red-100 p-3 rounded-md">
                    {error}
                </div>
            )}

            {/* Image Previews */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Original Image */}
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Imagen Original</h3>
                    {previewUrl ? (
                        <img src={previewUrl} alt="Vista previa" className="w-full h-auto object-contain rounded-lg shadow-inner border" />
                    ) : (
                        <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-lg text-gray-400">
                            Esperando imagen...
                        </div>
                    )}
                </div>

                {/* Result Image */}
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Resultado del Análisis</h3>
                    {loading ? (
                         <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-lg text-gray-400">
                            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                         </div>
                    ) : resultUrl ? (
                        <img src={resultUrl} alt="Resultado del análisis" className="w-full h-auto object-contain rounded-lg shadow-inner border" />
                    ) : (
                        <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-lg text-gray-400">
                            El resultado aparecerá aquí.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ObjectDetectionCard;
