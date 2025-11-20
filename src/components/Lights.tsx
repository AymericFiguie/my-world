const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[100, 50, 50]} // above and to the side
        intensity={1.8}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={500}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
      />
      <pointLight position={[0, 20, 0]} intensity={0.4} />
    </>
  );
};

export default Lights;
