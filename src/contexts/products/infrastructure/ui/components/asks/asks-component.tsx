import { useState } from 'react';
import type { Asks } from '@products/domain/model/asks.ts';

interface Props {
    questions: Asks[];
}

/**
 * Componente para mostrar y enviar preguntas frecuentes.
 * @param props - Props del componente.
 * @param props.questions - Lista de preguntas frecuentes.
 * @returns Componente que renderiza un formulario para enviar preguntas y una lista de preguntas recientes.
 */
export function AsksComponent({ questions }: Props) {
    const [question, setQuestion] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (question.trim()) {
            setQuestion('');
        }
    };

    return (
        <>
            <div className="max-w-md w-full">
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Escribe tu pregunta..."
                        className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400 transition"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition"
                    >
                        Preguntar
                    </button>
                </form>
            </div>
            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Últimas realizadas</h3>
                <div className="space-y-6">
                    {questions.map((q, idx) => (
                        <div key={idx}>
                            <p className="text-sm font-medium text-gray-800">{q.text}</p>
                            {q.answer && (
                                <div className="pl-4 border-l border-gray-300 mt-1">
                                    <p className="text-sm text-gray-600 leading-relaxed">{q.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
