import React, { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  const faqs = [
    {
      question: "What is GoldenG?",
      answer: (
        <div className="space-y-2">
          <p><strong>At the beginning:</strong> <span className="text-yellow-600">(Goldeng)</span> is more than a meme. It is the meme, now is small and not well known, but it has a lot of potencial.</p>
          <p><strong>Hatching:</strong> As more people create memes(eggs) and the egg becomes famous, it hatches. Now we have more <span className="text-yellow-600">Goldengs</span>.</p>
          <p><strong>Shared Ownership:</strong> We all own a small part of all hatched eggs (1%). This is managed by the treasury.</p>
          <p><strong>Virtuous Circle:</strong> The treasury holds and gradually buys back <span className="text-yellow-600">Goldeng</span>, which increases its value. Additionally, you can earn more <span className="text-yellow-600">Goldeng</span> by staking it (like taking care of the egg to make it grow).</p>
          <p><strong>In short:</strong> <span className="text-yellow-600">Goldeng</span> is like a magic egg that grows when more people come together and take care of it. So join the virtuous circle and watch our golden eggs grow! 🌟🐣</p>
        </div>
      )
    },
    {
      question: "How to buy?",
      answer: (
        <span>
          Cuak! Cuak! go there via{" "}
          <a
            className="text-blue-500 underline"
            href="https://birdeye.so/token/CcxreSMUycHVRGUxbSTMrPG9GgRiZ9A8pKFzn6G6YAM2/Hjjpt3M2koFkAvS39uyinYRRsqRWqPi1Vt5jjkJeKwNn?chain=solana"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
        </span>
      )
    },
    {
      question: "TAX?",
      answer: "Cuack, we no, We have no Tax."
    },
    {
      question: "Presale?",
      answer: "Cuak!! We no presale!!"
    }
  ];

  return (
    <div className="flex flex-col items-center font-goldeng justify-center min-h-screen p-10 bg-gradient-to-r from-transparent to-transparent backdrop-blur-md">
      <div className="bg-white bg-opacity-50 rounded-2xl border border-gray-200 p-6 flex flex-col items-center text-center shadow-lg space-y-4 w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">FAQ</h1>
        {faqs.map((faq, index) => (
          <div key={index} className="w-full">
            <h2
              className="text-2xl font-semibold cursor-pointer px-4 py-2  rounded-lg"
              onClick={() => toggleAnswer(index)}
            >
              Q: {faq.question}
            </h2>
            {openIndex === index && (
              <div className="text-left text-xl px-4 py-2 bg-gray-100 rounded-lg mt-2 space-y-2">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
