import { useThree, useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import { Vector3, MathUtils, Quaternion } from 'three';

const CameraController = ({
  camX,
  camY,
  camZ,
  targetX,
  targetY,
  targetZ,
  shipRef,
  scrollY,
  scrollTakeOff,
}) => {
  const { camera } = useThree();

  const desiredPos = useRef(new Vector3());
  const desiredTarget = useRef(new Vector3());
  const smoothPos = useRef(new Vector3(camX, camY, camZ));
  const smoothTarget = useRef(new Vector3(targetX, targetY, targetZ));

  const followStart = scrollTakeOff + 500;

  useEffect(() => {
    camera.position.set(camX, camY, camZ);
    camera.lookAt(targetX, targetY, targetZ);
    smoothPos.current.set(camX, camY, camZ);
    smoothTarget.current.set(targetX, targetY, targetZ);
  }, []);
  useFrame(() => {
    if (!shipRef?.current || scrollY < followStart) {
      desiredPos.current.set(camX, camY, camZ);
      desiredTarget.current.set(targetX, targetY, targetZ);

      // very smooth return to Leva position
      smoothPos.current.lerp(desiredPos.current, 0.05);
      smoothTarget.current.lerp(desiredTarget.current, 0.005);

      camera.position.copy(smoothPos.current);
      camera.lookAt(smoothTarget.current);
      return;
    }

    const followDistance = 40;
    const verticalLift = 6;
    const shipPos = new Vector3();
    shipRef.current.getWorldPosition(shipPos);
    const forward = new Vector3();
    shipRef.current.getWorldDirection(forward);
    desiredPos.current
      .copy(shipPos)
      .add(forward.clone().multiplyScalar(-followDistance))
      .add(new Vector3(0, verticalLift, 0));
    const t = MathUtils.clamp((scrollY - scrollTakeOff) / 15000, 0.015, 0.12);
    smoothPos.current.lerp(desiredPos.current, t);

    camera.position.copy(smoothPos.current);

    camera.up.set(0, 1, 0);

    // Desired UP-facing look direction
    const desiredLook = new Vector3(-0.03, 1, 0.15);

    // Convert that direction into a quaternion
    const targetQuat = new Quaternion().setFromUnitVectors(
      new Vector3(0, 0, -1), // camera's default forward
      desiredLook.clone().normalize(),
    );

    // Smoothly slerp the camera orientation toward looking upward
    camera.quaternion.slerp(targetQuat, 0.03);
    camera.rotateZ(0.016);
  });

  return null;
};

export default CameraController;
