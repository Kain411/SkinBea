import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const wS = Dimensions.get('screen').width / 100;

const Partner = () => {
    return (
        <TouchableOpacity style={[styles.flexBox, styles.partner]}>
            <Image 
                source={require('../img/asa.jpg')}
                style={styles.imgPartner}
            />
            <View style={styles.active}></View>
            <View style={[styles.centerRow, styles.detailsPartner]}>
                <Text style={styles.namePartner}>Enami Asa</Text>
                <View style={[styles.flexBox, styles.spaceBetween]}>
                    <Text style={[styles.sizePartner]}>You: bla bla</Text>
                    <Text style={[styles.sizePartner, styles.timeSend]}>23:00</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const Chat = () => {
    return (
        <View style={{flex: 1}}>
            <Text style={styles.title}>Chat Section</Text>
            <ScrollView style={styles.contentMain}>
                <TouchableOpacity style={[styles.flexBox, styles.centerColumn, styles.search]}>
                    <Image 

                        source={require('../img/search.png')}
                        style={styles.iconSearch}
                    />
                    <TextInput 
                        placeholder="Search..."
                        style={styles.inputSearch}
                    />
                </TouchableOpacity>
                {Partner()}
                {Partner()}
                {Partner()}
                {Partner()}
                {Partner()}
                {Partner()}
                {Partner()}
                {Partner()}
                {Partner()}
                {Partner()}
                {Partner()}
                {Partner()}
                {Partner()}
                {Partner()}
                {Partner()}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        color: '#000000',
        fontSize: 25,
        fontWeight: 'bold',
        marginVertical: 20,
        marginHorizontal: wS*6,
    },
    contentMain: {
        paddingHorizontal: wS*6,
    },
    flexBox: {
        display: 'flex',
        flexDirection: 'row',
    },
    centerRow: {
        justifyContent: 'center',
    },
    centerColumn: {
        alignItems: 'center',
    },
    spaceBetween: {
        justifyContent: 'space-between',
    },
    search: {
        flex: 1,
        backgroundColor: 'rgba(186,233,178,0.2)',
        paddingHorizontal: wS*5,
        height: wS*12.5,
        borderRadius: wS*12.5,
    },
    iconSearch: {
        width: wS*6,
        height: wS*6,
        objectFit: 'cover',
    },
    inputSearch: {
        flex: 1,
        marginLeft: wS*5,
        fontSize: 18,
        color: '#CCCCCC',
    },
    partner: {
        flex: 1,
        backgroundColor: 'rgba(186,233,178,0.8)',
        height: wS*15,
        marginTop: 25,
        borderTopLeftRadius: wS*15,
        borderBottomLeftRadius: wS*15,
        borderTopRightRadius: wS*15,
        borderBottomRightRadius: wS*15,
    },
    imgPartner: {
        width: wS*15,
        height: wS*15,
        objectFit: 'cover',
        borderRadius: wS*15,
        borderWidth: 4,
        borderColor: '#81D773'
    },
    detailsPartner: {
        flex: 1,
        marginLeft: wS*5,
        marginRight: wS*10,
    },
    namePartner: {
        fontSize: 18,
        color: '#000000',
        fontWeight: 'bold',
    },
    sizePartner: {
        fontSize: 15,
        color: '#000000',
    },
    timeSend: {
        color: '#81D773',
        fontWeight: 'bold'
    },
    active: {
        width: wS*3,
        height: wS*3,
        borderRadius: wS*3,
        backgroundColor: '#81D773',
        borderWidth: 1,
        borderColor: '#ffffff',
        position: 'absolute',
        top: wS*11.5,
        left: wS*11,
    },
})      

export default Chat;