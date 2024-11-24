import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'qwerty1234',
  database: 'snapchat',
};

async function loginUser(email: string, password: string) {
  try {
    const connection = await mysql.createConnection(dbConfig);

    // 사용자 인증 쿼리 실행
    const [rows]: [any[], any] = await connection.query(
      'SELECT * FROM user WHERE user_email = ? AND password = ?',
      [email, password]
    );

    // 결과 처리
    if (rows.length > 0) {
      const user = rows[0];
      console.log('로그인 성공:', user);
      return user; // 로그인 성공 시 사용자 정보 반환
    } else {
      console.log('로그인 실패: 이메일 또는 비밀번호가 잘못되었습니다.');
      return null; // 로그인 실패
    }
  } catch (error) {
    console.error('데이터베이스 오류:', error);
    throw error; // 오류 처리
  }
}

;

