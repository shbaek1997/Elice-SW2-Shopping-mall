import cors from 'cors';
import express from 'express';
import passport from 'passport';
import {
    viewsRouter,
    userRouter,
    orderRouter,
    authRouter,
    adminRouter,
} from './routers';
import { productRouter } from './routers/product-router';

import { errorHandler } from './middlewares';
import {
    passportConfiguration,
    JWTConfiguration,
    KakaoConfiguration,
} from './services/passport';
import { loginRequired } from './middlewares';
import { adminRequired } from './middlewares';
const app = express();

// CORS 에러 방지
app.use(cors());

// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());

// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({ extended: false }));

// html, css, js 라우팅
app.use(viewsRouter);

app.use(passport.initialize()); // passport 사용 시작
passportConfiguration(); // passport.use 로 local strategy 사용
JWTConfiguration(); // passport.use로 jwt strategy 사용
KakaoConfiguration();
// api 라우팅
// 아래처럼 하면, userRouter 에서 '/login' 으로 만든 것이 실제로는 앞에 /api가 붙어서
// /api/login 으로 요청을 해야 하게 됨. 백엔드용 라우팅을 구분하기 위함임.

app.use('/api/users', userRouter);
app.use('/api/auth', loginRequired, authRouter);
app.use('/api/order', loginRequired, orderRouter);
app.use('/api/admin', loginRequired, adminRequired, adminRouter);
app.use('/api/products', productRouter);

//해야할게 order.get 요청시 상품 데이터, 관리자가 카테고리 수정 (구현할 API)
// api/auth/userID => get 요청 해야함..
// admin 의 상품 관련 post/patch/delete 추가 해야함.

//상품 삭제시 카테고리 반영 ...
// 상품이 구매되면, quantity -1 해야함. orderSchema에 구매시 상품이 확실히 반영..
//상품 조회하면 view 올라가야함 +1

// 순서 중요 (errorHandler은 다른 일반 라우팅보다 나중에 있어야 함)
// 그래야, 에러가 났을 때 next(error) 했을 때 여기로 오게 됨
app.use(errorHandler);

export { app };
