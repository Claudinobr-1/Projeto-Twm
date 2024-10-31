import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';
import './Modelo.css';

const Ordem = () => {
    const [carregaBiblioteca, setCarregaBiblioteca] = useState(false);
    const [Lidoss, setLidoss] = useState([]);
    const [Desejadoss, setDesejadoss] = useState([]);

    const fetchDados = () => {
        fetch("http://localhost:5000/alldesejadoss", {
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: "GET",
        })
        .then((response) => response.json())
        .then((data) => setDesejadoss(data))
        .catch((error) => console.log(error));

        fetch("http://localhost:5000/all_lidos", {
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: "GET",
        })
        .then((response) => response.json())
        .then((data) => setLidoss(data))
        .catch((error) => console.log(error));
    };

    useEffect(() => {
        if (carregaBiblioteca) {
            fetchDados();
            setCarregaBiblioteca(false);
        }
    }, [carregaBiblioteca]);

    const handleCarregaBiblioteca = () => {        
        setCarregaBiblioteca(true);
    };

    return (
        <Container className="biblioteca-container">
            <h1 className="titulo">Sua Biblioteca</h1>
            <Button variant="primary" onClick={handleCarregaBiblioteca}>Atualizar</Button>

            <div className="secao">
                <h2>Livros Desejados</h2>
                <div className="livros">
                    {Desejadoss.map((desejados) => (
                        <Card key={desejados.id} className="livro-card">
                            <Card.Body>
                                <Card.Title>{desejados.titulo}</Card.Title>
                                <Card.Text>
                                    <strong>Gênero:</strong> {desejados.genero}<br/>
                                    <strong>Autor:</strong> {desejados.autor}<br/>
                                    <strong>Data Publicação:</strong> {desejados.dataPub}<br/>
                                    <strong>Editora:</strong> {desejados.editora}<br/>
                                    <strong>Status:</strong> {desejados.status}<br/>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="secao">
                <h2>Livros Lidos</h2>
                <div className="livros">
                    {Lidoss.map((lidos) => (
                        <Card key={lidos.id} className="livro-card">
                            <Card.Body>
                                <Card.Title>{lidos.titulo}</Card.Title>
                                <Card.Text>
                                    <strong>Gênero:</strong> {lidos.genero}<br/>
                                    <strong>Autor:</strong> {lidos.autor}<br/>
                                    <strong>Avaliação:</strong> {lidos.avaliacao}<br/>
                                    <strong>Comentário:</strong> {lidos.comentario}<br/>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default Ordem;

