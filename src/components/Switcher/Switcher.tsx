import {styled} from '@mui/material/styles';
import Switch, {SwitchProps} from '@mui/material/Switch';

const Switcher = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(() => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',

        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: 'var(--button-background-color)',

            '& + .MuiSwitch-track': {
                backgroundColor: 'var(--secondly-background-color)',
                opacity: 1,
                border: 0,
            },
        },

        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
    },

    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },

    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: 'var(--secondly-background-color)',
        opacity: 1,
        transition: 'background-color 500ms',
    },
}));

export default Switcher;