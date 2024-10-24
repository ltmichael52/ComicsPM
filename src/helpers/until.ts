const bcrypt = require('bcrypt')
const saltRounds = 10;

export const hashPassword = async (plainPassword: string): Promise<string> => {
    try {
        const h = await bcrypt.hash(plainPassword,saltRounds)
        return h
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
};

export const comparePasswordHelper = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
    try {
        return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
        console.error('Error comparing password:', error);
        throw error;
    }
};