import React from 'react';
import Particles from 'react-particles-js';

const ParticleBackground = () => {
  return (
    <div>
      <Particles
        params={{
          particles: {
            number: {
              value: 150,
              density: {
                enable: true,
                value_area: 800
              }
            }
          }
        }}
      />
    </div>
  );
};

export default ParticleBackground;