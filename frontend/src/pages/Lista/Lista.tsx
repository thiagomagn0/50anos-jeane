
import "./Lista.css";



const sugestoes = [
  "Blusa tamanho M",
  "Saia, short ou calça tamanho 42",
  "Sapato número 34",
  "Perfume adocicado",
  "Relógio dourado, prateado ou digital",
];

export default function Lista() {

  return (
    <div className="lista fade-page">
      <div className="lista__container">

       <header className="lista__header">
  <h1 className="lista__title">Sugestões de Presentes</h1>
  <p className="lista__subtitle">
    Sua presença é o maior presente 💛<br />
    Mas, caso queira presentear, seguem algumas sugestões:
  </p>
</header>

    <div className="lista__grid">
       <div className="sugestoes">
          {sugestoes.map((item, index) => (
            <div
              key={index}
              className="sugestao-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {item}
            </div>
          ))}
        </div>
        </div>    
      </div>   
    </div>
  );
}