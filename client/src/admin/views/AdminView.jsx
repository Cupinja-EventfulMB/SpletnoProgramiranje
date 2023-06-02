import React from 'react'

//COMPONENTS 
import Button from "../../components/Button";
import AdminHero from 'admin/components/AdminHero';
import AdminOptionsCard from 'admin/components/AdminOptionsCard';

const cardsData = [
  { title: 'Edit institutions', link: '/admin-institutions', image: "images/institution.webp" },
  { title: 'Edit events', link: '/admin-events', image: "images/event.png" },
  { title: 'Edit users', link: '/admin-users', image: "images/users.jpg" },
];


const AdminView = () => {
  return (
    <>
        <AdminHero />
        <div className="w-full flex flex-row mt-10 justify-center gap-8">
        {cardsData.map((card, index) => (
          <AdminOptionsCard key={index} title={card.title} link={card.link} image={card.image} />
        ))}
      </div>
    </>
  )
}

export default AdminView;