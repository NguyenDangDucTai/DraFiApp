const setUser = (data: any) =>(
    {
        type: 'Set_User',
        payload: data,
    }
)

export {setUser};
