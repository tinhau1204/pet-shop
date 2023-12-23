
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    data: {
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
        user: {
            id: number;
            name: string;
            email: string;
            phone: string;
            username: string;
            is_admin: boolean;
        };
    };

}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const body = JSON.parse(req.body);
    res.setHeader('Set-Cookie', 'user=Hello, Cookie!; Path=/');
    if (body) {
        res.status(200).json({ message: 'Cookie set successfully' })
    }
}