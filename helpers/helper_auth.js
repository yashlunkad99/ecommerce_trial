import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
     try{
        const saltRound = 10;
        const password_hashed = await bcrypt.hash(password,saltRound);
        return password_hashed;
     }
     catch(error)
     {
        console.log(error);
     }
};

export const comparePassword = async (password,password_hashed) => {
    return bcrypt.compare(password,password_hashed);
};