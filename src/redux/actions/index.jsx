import {
    TEST_ACTION,
    CREATE_EVENT,
    UPDATE_EVENT,
    DELETE_EVENT,
    OPEN_MODAL,
    CLOSE_MODAL,
} from "./types";

export const testAction = () => {
    return { type: TEST_ACTION };
};

export const createEvent = (event) => {
    return {
        type: CREATE_EVENT,
        payload: {
            event,
        },
    };
};

export const updateEvent = (event) => {
    return {
        type: UPDATE_EVENT,
        payload: {
            event,
        },
    };
};

export const deleteEvent = (eventId) => {
    return {
        type: DELETE_EVENT,
        payload: {
            eventId,
        },
    };
};

export const openModal = (modalType, modalProps) => {
    return {
        type: OPEN_MODAL,
        payload: {
            modalType,
            modalProps,
        },
    };
};

export const closeModal = () => {
    return {
        type: CLOSE_MODAL,
    };
};
