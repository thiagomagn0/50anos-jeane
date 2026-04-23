import { useState, useEffect } from "react";
import type { GiftItem } from "../../types/GiftItem";
import { GiftCard } from "../../components/GiftCard/GiftCard";
import { ReservationForm } from "../../components/ReservationForm/ReservationForm";
import { getDocs, collection, addDoc } from "firebase/firestore";
import type { Reserva } from "../../types/Reserva";
import "./Lista.css";
import { db } from "../../services/firebase";
import { ThankYouModal } from "../../components/AgradecimentoModal/AgradecimentoModal";
import confetti from "canvas-confetti";
import { StoresModal } from "../../components/StoresModal/StoresModal";
import { useToast } from "../../hooks/useToast";


const initialItems: GiftItem[] = [
  {
    id: 1,
    name: "Camisa Bahia (tricolor)",
    image: "https://images.puma.com/image/upload/f_auto,q_auto,w_600,b_rgb:FAFAFA/global/787234/01/fnd/BRA/fmt/png",
    store: "",
    color: "Tricolor",
    material: "Poliéster",
    note: "Referência do clube",
    price: 249.9,
    total: 2,
    reserved: []
  },
  {
    id: 2,
    name: "Boné Bahia",
    image: "https://http2.mlstatic.com/D_NQ_NP_2X_857872-MLA105698900627_012026-F.webp",
    store: "",
    color: "Azul",
    material: "Algodão",
    note: "Tema Bahia",
    price: 69.9,
    total: 3,
    reserved: []
  },
  {
    id: 3,
    name: "Caneca Bahia",
    image: "https://http2.mlstatic.com/D_NQ_NP_2X_885640-MLU78159524503_082024-F.webp",
    store: "",
    color: "Branco/Azul",
    material: "Cerâmica",
    note: "Personalizada Bahia",
    price: 39.9,
    total: 4,
    reserved: []
  },
  {
    id: 4,
    name: "Bandeira Bahia",
    image: "https://http2.mlstatic.com/D_NQ_NP_2X_881963-MLB82397336128_022025-F.webp",
    store: "",
    color: "Tricolor",
    material: "Poliéster",
    note: "",
    price: 59.9,
    total: 2,
    reserved: []
  },
  {
    id: 5,
    name: "Chinelo Bahia",
    image: "https://cdn-icons-png.flaticon.com/512/1046/1046867.png",
    store: "",
    color: "Azul",
    material: "Borracha",
    note: "",
    price: 49.9,
    total: 3,
    reserved: []
  },
  {
    id: 6,
    name: "Almofada Bahia",
    image: "https://cdn-icons-png.flaticon.com/512/1046/1046857.png",
    store: "",
    color: "Tricolor",
    material: "Tecido",
    note: "",
    price: 59.9,
    total: 2,
    reserved: []
  },
  {
    id: 7,
    name: "Chaveiro Bahia",
    image: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
    store: "",
    color: "Tricolor",
    material: "Metal",
    note: "",
    price: 19.9,
    total: 5,
    reserved: []
  },
  {
    id: 8,
    name: "Garrafa Bahia",
    image: "https://cdn-icons-png.flaticon.com/512/1046/1046790.png",
    store: "",
    color: "Azul",
    material: "Inox",
    note: "",
    price: 89.9,
    total: 2,
    reserved: []
  },
  {
    id: 9,
    name: "Toalha Bahia",
    image: "https://cdn-icons-png.flaticon.com/512/1046/1046862.png",
    store: "",
    color: "Tricolor",
    material: "Algodão",
    note: "",
    price: 69.9,
    total: 3,
    reserved: []
  },
  {
    id: 10,
    name: "Quadro Bahia",
    image: "https://cdn-icons-png.flaticon.com/512/1828/1828925.png",
    store: "",
    color: "Tricolor",
    material: "MDF",
    note: "",
    price: 79.9,
    total: 2,
    reserved: []
  }
];
export default function Lista() {
  const [items, setItems] = useState<GiftItem[]>(initialItems);
  const [selectedItem, setSelectedItem] = useState<GiftItem | null>(null);
  const { showToast } = useToast(); // ✅ AGORA NO LUGAR CERTO
  const [form, setForm] = useState({
    name: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  // 🔥 NOVO: modal de lojas
  const [showStoresModal, setShowStoresModal] = useState(false);
  const [storeQuery, setStoreQuery] = useState("");

  const playSound = () => {
    const audio = new Audio("/sounds/aplausos.wav");
    audio.volume = 0.3;
    audio.play();
  };

  // 🔥 FIREBASE
  const fetchReservas = async () => {
    const snapshot = await getDocs(collection(db, "reservas"));

    const reservas: Reserva[] = snapshot.docs.map(
      (doc) => doc.data() as Reserva
    );

    setItems((prevItems) =>
      prevItems.map((item) => {
        const reservasDoItem = reservas.filter(
          (r: Reserva) => r.item === item.name
        );

        return {
          ...item,
          reserved: reservasDoItem.map((r: Reserva) => ({
            name: r.name,
            phone: r.phone,
          })),
        };
      })
    );
  };

  // 🔥 NOVO: abrir modal de lojas
const handleViewStores = (item: GiftItem) => {
  const query = [
    item.name,
    item.color,
    item.material
  ]
    .filter(Boolean)
    .join(" ");

  setStoreQuery(query);
  setShowStoresModal(true);
};

  const handleSelectItem = (item: GiftItem) => {
    setSelectedItem(item);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

 const handleReserve = async (isPix = false) => {
  // 🔒 validação básica
  if (!form.name.trim() || !form.phone.trim()) {
    showToast("Preencha todos os campos 😢", "error");
    return;
  }

  // 🔒 valida item selecionado
  if (!selectedItem) {
    showToast("Selecione um presente primeiro 🎁", "error");
    return;
  }

  // 🔒 valida telefone (já mascarado)
  if (form.phone.replace(/\D/g, "").length < 10) {
    showToast("Telefone inválido 😢", "error");
    return;
  }

  try {
    setLoading(true);

      // 🔥 AQUI ENTRA A VALIDAÇÃO DE DUPLICIDADE
    const snapshot = await getDocs(collection(db, "reservas"));

    const alreadyReserved = snapshot.docs.some((doc) => {
      const data = doc.data();
      return (
        data.item === selectedItem.name &&
        data.phone === form.phone
      );
    });

    if (alreadyReserved) {
      showToast("Você já reservou este item 😅", "error");
      return;
    }

 await addDoc(collection(db, "reservas"), {
  item: selectedItem.name,
  name: form.name.trim(),
  phone: form.phone,
  status: "pendente",

  type: isPix ? "pix" : "presente", // 🔥 NOVO
  price: selectedItem.price || 0,   // 🔥 NOVO (se tiver)

  createdAt: new Date(),
});

    await fetchReservas();

    // 🧹 reset
    setForm({ name: "", phone: "" });
    setSelectedItem(null);

    // 🎉 efeitos
    confetti({ particleCount: 80, spread: 70, zIndex: 9999 });

    setTimeout(() => {
      confetti({ particleCount: 50, spread: 100, zIndex: 9999 });
    }, 700);

    playSound();

    setShowThankYou(true);

    // setTimeout(() => {
    //   setShowThankYou(false);
    // }, 3000);

    // ✅ feedback final
    showToast("Presente reservado com sucesso 🎉", "success");

  } catch (error) {
    console.error("ERRO:", error);
    showToast("Erro ao enviar presente 😢", "error");
  } finally {
    setLoading(false);
  }
};

 useEffect(() => {
  let mounted = true;

  const loadData = async () => {
    const snapshot = await getDocs(collection(db, "reservas"));

    if (!mounted) return;

    const reservas: Reserva[] = snapshot.docs.map(
      (doc) => doc.data() as Reserva
    );

    setItems((prevItems) =>
      prevItems.map((item) => {
        const reservasDoItem = reservas.filter(
          (r) => r.item === item.name
        );

        return {
          ...item,
          reserved: reservasDoItem.map((r) => ({
            name: r.name,
            phone: r.phone,
          })),
        };
      })
    );
  };

  loadData();

  return () => {
    mounted = false;
  };
}, []);

  return (
    <div className="lista fade-page">
      <div className="lista__container">

        <header className="lista__header">
          <h1 className="lista__title">Lista de Presentes</h1>
          <p className="lista__subtitle">
          Sua presença é o maior presente, mas se quiser nos presentear 💛
        </p>
        </header>

        <div className="lista__grid">
          {items.map((item, index) => (
            <GiftCard
              key={item.id}
              item={item}
              onSelect={handleSelectItem}
              onViewStores={handleViewStores} // 🔥 AQUI MUDOU              
              style={{
                animationDelay: `${index * 0.15}s`,
              }}
            />
          ))}
        </div>

        {selectedItem && (
          <ReservationForm
            itemName={selectedItem.name}
            form={form}
            setForm={setForm}
            onConfirm={handleReserve}
            onClose={() => setSelectedItem(null)}
            loading={loading}
          />
        )}

        <ThankYouModal
          isOpen={showThankYou}
          onClose={() => setShowThankYou(false)}
        />
      </div>

      {/* 🔥 NOVO MODAL DE LOJAS */}
      {showStoresModal && (
        <StoresModal
          query={storeQuery}
          onClose={() => setShowStoresModal(false)}
        />
      )}
    </div>
  );
}