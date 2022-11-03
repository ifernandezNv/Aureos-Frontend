import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import {View} from 'react-native';

function Wave({customStyles}) {
  return (
    <View style={customStyles}>
      <View style={{ backgroundColor: '#6DD3B5', height: 110 }}>
        <Svg
          height="100%"
          width="100%"
          viewBox="0 0 1440 320"
          style={{ position: 'absolute', top: 100 }}
        >
          <Path
            fill="#6DD3B5"
            d="M0,192L30,176C60,160,120,128,180,138.7C240,149,300,203,360,202.7C420,203,480,149,540,149.3C600,149,660,203,720,224C780,245,840,235,900,192C960,149,1020,75,1080,42.7C1140,11,1200,21,1260,69.3C1320,117,1380,203,1410,245.3L1440,288L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"
          />
        </Svg>
      </View>
    </View>
  )
}

export default Wave