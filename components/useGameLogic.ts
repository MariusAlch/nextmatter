import { useState, useEffect } from "react";
import shuffle from "lodash/shuffle";
import { SimultaneousAudio } from "./SimultaneousAudio";
import swal from "sweetalert2";

interface Card {
  imageUrl: string;
  id: string;
}

const wooshSound = new SimultaneousAudio("/sounds/woosh.mp3");
const tadaSound = new SimultaneousAudio("/sounds/tada.mp3");

export function useGameLogic() {
  const images = [
    "/images/dylan.jpeg",
    "/images/isabel.jpeg",
    "/images/jan.jpeg",
    "/images/josh.jpeg",
    "/images/luke.jpeg",
    "/images/marc.jpeg",
    "/images/paris.jpg",
    "/images/pierre.jpeg",
    "/images/reyna.jpeg",
    "/images/stefan.jpeg",
    "/images/steve.jpeg",
    "/images/tassilo.jpeg",
  ];

  const [cards, setCards] = useState([] as Card[]);
  const [isUIBlocked, setUIBlocked] = useState(false);
  const [foundCardsIds, setFoundCardsIds] = useState([] as string[]);
  const [revealedCardsIds, setRevealedCardsIds] = useState([] as string[]);

  function revealCard(id: string) {
    if (isUIBlocked) {
      return;
    }

    if (revealedCardsIds.length === 0) {
      wooshSound.play();
      return setRevealedCardsIds([id]);
    }

    const cardA = getCardById(id);
    const cardB = getCardById(revealedCardsIds[0]);

    if (cardA.id === cardB.id) {
      return;
    }

    wooshSound.play();
    if (cardA.imageUrl === cardB.imageUrl) {
      setFoundCardsIds([...foundCardsIds, cardA.id, cardB.id]);
      setRevealedCardsIds([]);
      return;
    }

    /**
     * Automatically close revealed cards after a brief duration
     */
    setUIBlocked(true);
    setRevealedCardsIds([...revealedCardsIds, id]);
    setTimeout(() => {
      wooshSound.play();
      setUIBlocked(false);
      setRevealedCardsIds([]);
    }, 600);
  }

  function newGame() {
    const newCards: Card[] = [...images, ...images].map((imageUrl) => ({
      imageUrl,
      id: Math.random().toString(),
    }));
    setCards(shuffle(newCards));
  }

  function getCardById(id: string) {
    return cards.find((card) => card.id === id)!;
  }

  /**
   * Checking for win condition
   */
  useEffect(() => {
    if (cards.length > 0 && foundCardsIds.length === cards.length) {
      tadaSound.play();
      swal.fire({ icon: "success", title: "You won!", confirmButtonText: "Again!" }).then(() => {
        setFoundCardsIds([]);
        newGame();
      });
    }
  }, [cards, foundCardsIds]);

  useEffect(() => {
    newGame();
  }, []);

  return { revealCard, revealedCardsIds, cards, foundCardsIds };
}
