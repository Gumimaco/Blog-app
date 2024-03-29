import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const InfFetch = (url) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [list, setList] = useState([]);

    const sendQuery = useCallback(async () => {
        try {
        await setLoading(true);
        await setError(false);
        const res = await axios.get(url);
        await setList((prev) => [...prev, ...res.data]);
        setLoading(false);
        } catch (err) {
        setError(err);
        }
    }, [url]);

    useEffect(() => {
        sendQuery(url);
    }, [sendQuery, url]);

    return { loading, error, list };
}