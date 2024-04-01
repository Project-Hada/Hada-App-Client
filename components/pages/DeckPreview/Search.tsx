import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { useTheme } from '../../../utils/contexts/ThemeContext';

// Define the types for your props
type SearchProps = {
  handleSearchWord: (text: string) => void;
  searchTerm: string;
};

const Search: React.FC<SearchProps> = ({ handleSearchWord, searchTerm }) => {

    const theme = useTheme();
    return (
        <View style={[styles.searchContainer, theme.theme.shadow.searchbar]}>
        <AntDesign name="search1" style={styles.searchIcon} />
        <TextInput
            style={styles.searchInput}
            onChangeText={handleSearchWord}
            value={searchTerm}
            placeholder="Search"
            keyboardType="default"
        />
        </View>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        paddingVertical: 5,
        marginTop: 15,
        marginBottom: 15,
        marginHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "#FFFFFF",
    },
    searchIcon: {
        paddingLeft: 10,
        fontSize: 20,
        color: "#000000",
    },
    searchInput: {
        width: "100%",
        paddingLeft: 10,
    },
});

export default Search;
