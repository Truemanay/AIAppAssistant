import { record, saveOrUpdateRecordItem } from '../../module/recordStore';
import React, { useCallback, useRef } from 'react';
import { Pressable, PressableProps } from 'react-native';
import { _animateFuzzy } from '../functions';

type XYPressableProps = PressableProps;

export const AIPressable = ({ onPress, accessibilityLabel, ...props }: XYPressableProps) => {

    const myRef = useRef(null);

    const myOnPress = useCallback(() => {
        if (onPress) {
            // setTimeout(() => {
            onPress();
            // }, 1200);
            // const myRecord = record.find(item => item.action === accessibilityLabel);
            // _animateFuzzy(myRecord.x, myRecord.y);
        }
    }, [onPress]);

    if (onPress && accessibilityLabel) {

        console.log('onPress:', accessibilityLabel);
    }

    const myOnLayout = useCallback(() => {
        if (myRef && myRef.current && accessibilityLabel) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            myRef.current.measure((_x: any, _y: any, _width: any, _height: any, pageX: any, pageY: any) => {
                console.log('tx:', pageX, 'ty:', pageY);
                saveOrUpdateRecordItem({ action: accessibilityLabel, x: pageX, y: pageY });
                // pageX and pageY give the position of the element relative to the whole screen
            });
        }
    }, [accessibilityLabel]);

    return <Pressable onLayout={myOnLayout} onPress={myOnPress} accessibilityLabel={accessibilityLabel} ref={myRef} {...props} />;
};
