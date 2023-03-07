import './Greetings.css';
import { NavLink } from 'react-router-dom';

const Greetings = () => {
    return (
        <div className='greetings'>
            <h1 className='greetings__title'>IT HUB «Северстали» 2023</h1>
            <p className='greetings__subtitle'>Тестовое задание "Заметки"</p>
            <NavLink className='greetings__link' to='notes'>
                Решение
            </NavLink>
            <div className='greetings__about'>
                <p className='greetings__about-name'>Долгоносов Константин</p>
                <p className='greetings__about-email'>dolgonosov.konstantin@yandex.ru</p>
                <ul className='greetings__about-social'>
                    <li className='greetings__about-social-item'>
                        <a
                            className='greetings__about-social-link greetings__about-social-link_type_github'
                            href='https://github.com/kdolgonosov'
                            target='_blank'
                            rel='noreferrer'
                        ></a>
                    </li>
                    <li className='greetings__about-social-item'>
                        <a
                            className='greetings__about-social-link greetings__about-social-link_type_telegram'
                            href='https://t.me/kdolgonosov'
                            target='_blank'
                            rel='noreferrer'
                        ></a>
                    </li>
                </ul>
            </div>
            <div className='greetings__rectangle'></div>
        </div>
    );
};

export default Greetings;
