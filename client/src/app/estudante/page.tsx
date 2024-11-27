'use client'; 
import { useState, useEffect } from "react";

interface CartaoEstudanteProps {
    nomeEstudante: string;
    curso: string;
}

// Componente que exibe o cartão do estudante
function CartaoEstudante ({ nomeEstudante, curso }: CartaoEstudanteProps) {
    return (
        <div style={{backgroundColor: '#a5b4fc', display: 'flex', flexDirection: 'column', width: '50%', height: 'max-content', padding: '20px', borderRadius:'8px' }}>
            <h2>Nome: <strong>{nomeEstudante}</strong></h2>
            <p>Curso: <strong>{curso}</strong></p>
        </div>
    );
}

interface AulasEstudanteProps {
    materias: string[];
    alterarNota: (indice: number, nota: number) => void;
}

function AulasEstudante ({ materias, alterarNota }: AulasEstudanteProps) {
    return (
        <div style={{display: 'flex', backgroundColor:'#fca5a5', flexDirection: 'column', width: '50%', height: 'max-content', padding: '20px', borderRadius:'8px', gap: '10px' }}>
            {/* Mapeia as matérias e cria um input para cada uma */}
            {materias.map((aula: string, indice: number) => (
                <div key={indice}>
                    <h2>Matéria: <strong>{aula}</strong></h2>
                    <p>Altere a nota:</p>
                    <input type="number" min={0} placeholder="Nota" onChange={
                        (event) => alterarNota(indice, Number(event.target.value))
                    } ></input>
                </div>
            ))}
        </div>
    );
}

export default function PaginaEstudante() {
    // Lista de matérias que o estudante está cursando e suas respectivas notas
    const materias = ['Informática teórica', 'Cálculo 1', 'Física 1', 'Inglês 1', 'Introdução à computação'];
    const [notas, setNotas] = useState<number[]>([0, 0, 0, 0, 0]);

    // Essa função é chamada toda vez que o input de nota é alterado, atualizando o estado das notas
    const handleAlterarNota = (indice: number, nota: number) => {
        const novasNotas = [...notas];
        novasNotas[indice] = nota;
        setNotas(novasNotas);
    }

    const [media, setMedia] = useState<number>(0);

    // Sempre que uma nota é alterada, a média é recalculada
    useEffect(() => {
        // Calcula a média das notas somando todas que estão no array "notas" e as dividindo pela quantidade de notas
        const mediaCalculada = notas.reduce((acc, nota) => acc + nota, 0) / notas.length;
        setMedia(mediaCalculada);
    }, [notas]);

    return (
        <div style={{height: '100%', width: '100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems: 'center', gap:'10px'}}>
            <CartaoEstudante nomeEstudante="Samuel" curso="Engenharia da Computação" />
            <AulasEstudante materias={materias} alterarNota={handleAlterarNota} />
            <h2>Média:</h2>
            <div style={{
                // Altera a cor de fundo do elemento de acordo com a média
                backgroundColor: media >= 7 ? '#4ade80' : media >= 3 ? '#fde047' : '#ef4444',
                padding:'5px',
                borderRadius:'8px'
            }}>{media}</div>
        </div>
    );
}
