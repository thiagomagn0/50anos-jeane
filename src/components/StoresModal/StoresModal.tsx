type Props = {
  query: string;
  onClose: () => void;
};

export function StoresModal({ query, onClose }: Props) {
  const encoded = encodeURIComponent(query);

  const google = `https://www.google.com/search?tbm=shop&hl=pt-BR&gl=BR&q=${encoded}`;
  const ml = `https://lista.mercadolivre.com.br/${encoded}`;
  const amazon = `https://www.amazon.com.br/s?k=${encoded}`;

  return (
    <div className="modal">
      <div className="modal__content">
        <h2>Onde comprar 🛒</h2>

        <div className="stores">
          <button onClick={() => window.open(google, "_blank")}>
            Google Shopping
          </button>

          <button onClick={() => window.open(ml, "_blank")}>
            Mercado Livre
          </button>

          <button onClick={() => window.open(amazon, "_blank")}>
            Amazon
          </button>
        </div>

        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}