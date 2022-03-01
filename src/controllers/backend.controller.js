import { isUndefinedOrNullOrEmpty } from "../utils";
import _ from 'lodash';

export const AuthError = {
    INVALID_INPUT: "Invalid Input",
    RECORD_NOT_FOUND: "Record not found.",
    NOT_FOUND: "User not found.",
    GENERAL_ERROR: "Some error occurred.",
}

const cardShuffle = async (req, res) => {
    try {
        let { userValue } = req.body;

        console.log(" req query [cardShuffle] :- ", req.body, '|| timestamp :- ', new Date().toTimeString());

        if (isUndefinedOrNullOrEmpty(userValue) || userValue == '0') {
            throw new Error(AuthError.INVALID_INPUT);
        }

        let cardLetter = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "X", "J", "Q", "K"];
        let cardVar = ["S", "H", "D", "C"];
        let cardList = [];
        let result = [];
        let extraCardList;

        //build the cardlist to match the exact required format
        for (let i = 0, iLen = cardVar.length; i < iLen; i++) {
            for (let j = 0, jLen = cardLetter.length; j < jLen; j++) {
                cardList.push(cardVar[i] + "-" + cardLetter[j])
            }
        }

        //randomize the cardlist
        let randomCardList = cardList.map((a) => ({ sort: Math.random(), value: a })).sort((a, b) => a.sort - b.sort).map((a) => a.value);

        //split the cardlist depend on the input size
        if (userValue >= 52) {

            for (let x = 0, xLen = userValue; x < xLen; x++) {
                result[x] = randomCardList[x];
                if (isUndefinedOrNullOrEmpty(randomCardList[x])) {
                    result[x] = '';
                }
            }

        } else {

            let perChunk = Math.floor(cardList.length / userValue);
            let remainder = cardList.length % userValue;

            result = randomCardList.reduce((resultArray, item, index) => {
                const chunkIndex = Math.floor(index / perChunk)

                if (!resultArray[chunkIndex]) {
                    resultArray[chunkIndex] = [] // start a new chunk
                }

                resultArray[chunkIndex].push(item)

                return resultArray
            }, [])

            if (remainder != 0) {
                extraCardList = result[userValue];
                result.splice(userValue, 1);
                for (let k = 0, kLen = extraCardList.length; k < kLen; k++) {
                    result[k].push(extraCardList[k]);
                }
            }
        }

        //stringfy it to match the required output format
        for (let y = 0, yLen = result.length; y < yLen; y++) {
            result[y] = result[y].toString();
        }

        res.send({
            ret: '0',
            data: {
                result
            }
        });

    } catch (e) {
        console.log(" error [cardShuffle] : - ", e);
        switch (e.message) {
            case AuthError.INVALID_INPUT: {
                res.status(403).send({
                    err: e.message
                });
                break;
            }
            default: {
                res.status(500).send({
                    err: e.message
                })
            }
        }
    }
}

export default {
    cardShuffle
}
