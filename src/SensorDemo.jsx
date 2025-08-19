// // import { useEffect, useState } from 'react';
// // export default function SensorDemo() {
// //   const [accel, setAccel] = useState({ x: 0, y: 0, z: 0 });
// //   const [orient, setOrient] = useState({ alpha: 0, beta: 0, gamma: 0 });
// //   useEffect(() => {
// //     // Device motion (acceleration)
// //     const handleMotion = (e) => {
// //       const { x = 0, y = 0, z = 0 } = e.accelerationIncludingGravity || {};
// //       setAccel({ x, y, z });
// //     };
// //     // Device orientation
// //     const handleOrientation = (e) => {
// //       const { alpha = 0, beta = 0, gamma = 0 } = e;
// //       setOrient({ alpha, beta, gamma });
// //     };
// //     window.addEventListener('devicemotion', handleMotion);
// //     window.addEventListener('deviceorientation', handleOrientation);
// //     // iOS 13+ permission request
// //     if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
// //       const requestPermission = async () => {
// //         try {
// //           await DeviceMotionEvent.requestPermission();
// //           await DeviceOrientationEvent.requestPermission();
// //           console.log('Sensors enabled');
// //         } catch (err) {
// //           console.warn('Permission denied', err);
// //         }
// //       };
// //       requestPermission();
// //     }
// //     return () => {
// //       window.removeEventListener('devicemotion', handleMotion);
// //       window.removeEventListener('deviceorientation', handleOrientation);
// //     };
// //   }, []);
// //   return (
// //     <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
// //       <h1>Accelerometer & Orientation</h1>
// //       <p>
// //         <strong>Accel:</strong> X: {accel.x.toFixed(2)} | Y: {accel.y.toFixed(2)} | Z: {accel.z.toFixed(2)}
// //       </p>
// //       <p>
// //         <strong>Orient:</strong> α: {orient.alpha.toFixed(2)} | β: {orient.beta.toFixed(2)} | γ:{' '}
// //         {orient.gamma.toFixed(2)}
// //       </p>
// //     </div>
// //   );
// // }
// import { useState } from 'react';
// export default function SensorDemo() {
//   const [accel, setAccel] = useState({ x: 0, y: 0, z: 0 });
//   const [orient, setOrient] = useState({ alpha: 0, beta: 0, gamma: 0 });
//   const [granted, setGranted] = useState(false);
//   const enableSensors = async () => {
//     try {
//       if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
//         // iOS permission request
//         const motionPermission = await DeviceMotionEvent.requestPermission();
//         const orientationPermission = await DeviceOrientationEvent.requestPermission();
//         if (motionPermission === 'granted' && orientationPermission === 'granted') {
//           attachListeners();
//           setGranted(true);
//         } else {
//           alert('Permission denied');
//         }
//       } else {
//         // Android / desktop (no permission needed)
//         attachListeners();
//         setGranted(true);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   const attachListeners = () => {
//     window.addEventListener('devicemotion', (e) => {
//       const { x = 0, y = 0, z = 0 } = e.accelerationIncludingGravity || {};
//       setAccel({ x, y, z });
//     });
//     window.addEventListener('deviceorientation', (e) => {
//       const { alpha = 0, beta = 0, gamma = 0 } = e;
//       setOrient({ alpha, beta, gamma });
//     });
//   };
//   return (
//     <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
//       <h1>Accelerometer & Orientation</h1>
//       {!granted && (
//         <button onClick={enableSensors} style={{ padding: '1rem 2rem', fontSize: '1rem', marginBottom: '1rem' }}>
//           Enable Sensors
//         </button>
//       )}
//       <p>
//         <strong>Accel:</strong> X: {accel.x.toFixed(2)} | Y: {accel.y.toFixed(2)} | Z: {accel.z.toFixed(2)}
//       </p>
//       <p>
//         <strong>Orient:</strong> α: {orient.alpha.toFixed(2)} | β: {orient.beta.toFixed(2)} | γ:{' '}
//         {orient.gamma.toFixed(2)}
//       </p>
//     </div>
//   );
// }
import { useState } from 'react';

export default function SensorDemo() {
  const [accel, setAccel] = useState({ x: 0, y: 0, z: 0 });
  const [orient, setOrient] = useState({ alpha: 0, beta: 0, gamma: 0 });
  const [enabled, setEnabled] = useState(false);

  const enableSensors = async () => {
    try {
      // iOS 13+ permission
      if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
        const motion = await DeviceMotionEvent.requestPermission();
        const orientation = await DeviceOrientationEvent.requestPermission();
        if (motion !== 'granted' || orientation !== 'granted') {
          alert('Permission denied');
          return;
        }
      }

      // Attach listeners after permission or on Android
      window.addEventListener('devicemotion', (e) => {
        const { x, y, z } = e.accelerationIncludingGravity || e.acceleration || {};
        setAccel({ x: x ?? 0, y: y ?? 0, z: z ?? 0 });
        console.log('Accel:', x, y, z);
      });

      window.addEventListener('deviceorientation', (e) => {
        setOrient({
          alpha: e.alpha ?? 0,
          beta: e.beta ?? 0,
          gamma: e.gamma ?? 0,
        });
        console.log('Orient:', e.alpha, e.beta, e.gamma);
      });

      setEnabled(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Accelerometer & Orientation</h1>
      {!enabled && (
        <button onClick={enableSensors} style={{ padding: '1rem 2rem', fontSize: '1rem', marginBottom: '1rem' }}>
          Enable Sensors
        </button>
      )}
      <p>
        <strong>Accel:</strong> X: {accel.x.toFixed(2)} | Y: {accel.y.toFixed(2)} | Z: {accel.z.toFixed(2)}
      </p>
      <p>
        <strong>Orient:</strong> α: {orient.alpha.toFixed(2)} | β: {orient.beta.toFixed(2)} | γ:{' '}
        {orient.gamma.toFixed(2)}
      </p>
      <p style={{ fontSize: '0.8rem', color: '#666' }}>
        Note: Some browsers require HTTPS or localhost to show sensor data.
      </p>
    </div>
  );
}
