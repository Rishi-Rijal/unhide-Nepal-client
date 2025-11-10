import FeatureCard from "../FeatureCard/FeatureCard";
import Container from "../Container/Container";

const Featured = () => (
  <section id="explore" className="py-10 bg-white">
    <Container>
      <h2 className="mb-6 text-center text-2xl font-bold text-slate-800">Featured Hidden Gems</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <FeatureCard
          image="https://images.unsplash.com/photo-1642156456271-458c1d19af24?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687"
          tag="Gandaki"
          title="Annapurna Base Camp"
          rating={4.8}
        />
        <FeatureCard
          image="https://plus.unsplash.com/premium_photo-1723881627816-30001656c4c1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8R29reW8lMjBMYWtlcyUyMFRyZWt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=900"
          tag="Koshi"
          title="Gokyo Lakes Trek"
          rating={4.7}
        />
        <FeatureCard
          image="https://images.unsplash.com/photo-1623029740976-91a889463278?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VGVuZ2JvY2hlJTIwTW9uYXN0ZXJ5fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=900"
          tag="Koshi"
          title="Tengboche Monastery"
          rating={4.9}
        />
        <FeatureCard
          image="https://images.unsplash.com/photo-1727962861627-017ade9234f6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QmFuZGlwdXIlMjBBbmNpZW50JTIwVmlsbGFnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900"
          tag="Gandaki"
          title="Bandipur Ancient Village"
          rating={4.6}
        />
      </div>
    </Container>
  </section>
);

export default Featured;
