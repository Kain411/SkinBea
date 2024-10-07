import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const wS = Dimensions.get('screen').width / 100;

const Voucher = () => {
    return (
        <View
            style={{
                ...styles.frame,
                ...styles.flexBox,
                justifyContent: 'space-between',
                backgroundColor: '#FBD0D0'
            }}
        >
            <Text style={{ ...styles.textFrame, fontSize: 16 }}>Freeship</Text>
            <TouchableOpacity style={styles.btnFrame} >
                <Text style={{ color: '#fff' }}>Give</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    flexBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    frame: {
        marginTop: wS * 2,
        height: wS * 12,
        paddingHorizontal: wS * 4,
        borderRadius: wS * 2,
    },
    textFrame: {
        fontSize: 20,
        color: '#000000',
        fontStyle: 'italic',
    },
    btnFrame: {
        backgroundColor: '#FF5151',
        width: wS * 12,
        height: wS * 7,
        borderRadius: wS,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default Voucher;