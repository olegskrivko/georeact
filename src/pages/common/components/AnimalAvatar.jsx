import { Avatar } from '@mui/material';

import bearImg from '../../../assets/images/profile/bear.svg';
import catImg from '../../../assets/images/profile/cat.svg';
import dogImg from '../../../assets/images/profile/dog.svg';
import foxImg from '../../../assets/images/profile/fox.svg';
import horseImg from '../../../assets/images/profile/horse.svg';
import owlImg from '../../../assets/images/profile/owl.svg';
import penguinImg from '../../../assets/images/profile/penguin.svg';
import pigImg from '../../../assets/images/profile/pig.svg';

// Map animal types to images
const animalImageMap = {
  fox: foxImg,
  dog: dogImg,
  cat: catImg,
  bear: bearImg,
  horse: horseImg,
  penguin: penguinImg,
  pig: pigImg,
  owl: owlImg,
};

const AnimalAvatar = ({ animal, username }) => {
  const imageSrc = animalImageMap[animal?.toLowerCase()] || null;
  const altText = username?.toUpperCase() || 'U';

  return (
    <Avatar
      src={imageSrc}
      alt={altText}
      sx={{ backgroundColor: '#00b3a4', color: '#fff', border: '2px solid #00b3a4' }}
    >
      {!imageSrc && altText[0]} {/* fallback to first letter if no image */}
    </Avatar>
  );
};

export default AnimalAvatar;
