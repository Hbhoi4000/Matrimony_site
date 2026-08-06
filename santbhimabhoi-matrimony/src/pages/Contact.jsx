import "./../css/contact.css";

const contacts = [
  {
    district: "Pune",
    taluka: "Haveli",
    person: "Hemant Bhoi",
    phone: "+91 9876543210",
    email: "pune@sbbmatrimony.com"
  },
  {
    district: "Mumbai",
    taluka: "Andheri",
    person: "Rahul Bhoi",
    phone: "+91 9876543211",
    email: "mumbai@sbbmatrimony.com"
  },
  {
    district: "Nagpur",
    taluka: "Nagpur",
    person: "Prakash Bhoi",
    phone: "+91 9876543212",
    email: "nagpur@sbbmatrimony.com"
  },
  {
    district: "Nashik",
    taluka: "Nashik",
    person: "Mahesh Bhoi",
    phone: "+91 9876543213",
    email: "nashik@sbbmatrimony.com"
  },
  {
    district: "Kolhapur",
    taluka: "Karveer",
    person: "Suresh Bhoi",
    phone: "+91 9876543214",
    email: "kolhapur@sbbmatrimony.com"
  },
  {
    district: "Jalgaon",
    taluka: "Dharangaon",
    person: "Anil Bhoi",
    phone: "+91 9876543215",
    email: "jalgaon@sbbmatrimony.com"
  },
  {
    district: "Aurangabad",
    taluka: "Aurangabad",
    person: "Ganesh Bhoi",
    phone: "+91 9876543216",
    email: "aurangabad@sbbmatrimony.com"
  },
  {
    district: "Amravati",
    taluka: "Amravati",
    person: "Ramesh Bhoi",
    phone: "+91 9876543217",
    email: "amravati@sbbmatrimony.com"
  }
];

export default function Contact() {
  return (
    <section className="contact-page">

      <div className="contact-hero">
        <h1>Contact Us</h1>

        <p>
          Find your district coordinator and connect with our trusted
          matrimony volunteers across Maharashtra.
        </p>
      </div>

      <div className="main-contact">

        <div className="main-card">
          <h2>Head Office</h2>

          <p>📍 Pune, Maharashtra</p>

          <p>📞 +91 90000 00000</p>

          <p>✉ support@sbbmatrimony.com</p>

          <p>🕘 Monday - Sunday (9:00 AM - 8:00 PM)</p>
        </div>

      </div>

      <h2 className="title">
        District Coordinators
      </h2>

      <div className="contact-grid">

        {contacts.map((item, index) => (

          <div className="contact-card" key={index}>

            <div className="circle">
              👤
            </div>

            <h3>{item.person}</h3>

            <span>{item.district}</span>

            <p>
              <strong>Taluka :</strong> {item.taluka}
            </p>

            <p>
              📞 {item.phone}
            </p>

            <p>
              ✉ {item.email}
            </p>

            <button>
              Contact Now
            </button>

          </div>

        ))}

      </div>

    </section>
  );
}