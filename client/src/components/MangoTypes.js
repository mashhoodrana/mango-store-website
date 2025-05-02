import React from 'react';

function MangoTypes() {
  const mangoVarieties = [
    {
      name: 'Chaunsa',
      description: 'Chaunsa is a popular mango variety known for its sweetness and unique flavor. It is one of the most loved mangoes in Pakistan.',
      image: 'https://link-to-chaunsa-image.jpg',
    },
    {
      name: 'Sindhri',
      description: 'Sindhri is one of the earliest varieties of mango, known for its juicy, sweet taste. It is harvested in the beginning of mango season.',
      image: 'https://link-to-sindhri-image.jpg',
    },
    {
      name: 'Langra',
      description: 'Langra is a traditional variety of mango with a unique taste. It is known for its fiberless texture and tangy-sweet flavor.',
      image: 'https://link-to-langra-image.jpg',
    },
  ];

  return (
    <div className="py-16 bg-yellow-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-12">Our Mango Varieties</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mangoVarieties.map((mango, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <img src={mango.image} alt={mango.name} className="w-full h-56 object-cover rounded-md mb-6" />
              <h3 className="text-2xl font-semibold text-green-600 mb-4">{mango.name}</h3>
              <p className="text-gray-700 mb-4">{mango.description}</p>
              <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition">
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MangoTypes;
