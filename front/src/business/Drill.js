import { useParams, Link } from "react-router-dom";
import { useFetch } from "../useFetch";
import { AdvancedItem } from "./AdvancedItem";

import css from './Drill.module.css';

export const Drill = () => {
    const params = useParams();

    const {drills: [drills], error: [error], loading: [loading]} = useFetch(`/api/v1/drills/${params.chapterNumber}/${params.drillNumber}`);

    if (loading) {
        return (
            <div className={css.loading}>
            <h1>Loading...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className={css.error}>
            <h1>Error: {error}</h1>
            </div>
        );
    }
    
    return (<main className={css.Drill}>
        <header>
            <div>
                <Link to="/">К выбору упражнений</Link>
            </div>
            <hr />
            <h1>Упражнение "{drills.title}"</h1>
            <h3>{drills.training_topic}</h3>
            <h4>Цели:</h4>
            <ol>
                {
                    drills.goals.map((goal, index) => {
                        return <li key={index}>{goal}</li>
                    })
                }
            </ol>
        </header>
        <section>
            <h3>Требуемые ресурсы</h3>
            {
                drills.required_resources.map((resource, index) => {
                    return <p key={index}>{resource}</p>
                })
            }
        </section>
        <section>
            <h2>Шаги упражнения</h2>
            {
                drills.instructions.map((instruction, index) => {
                    if (typeof instruction === "object"){

                        return <AdvancedItem key={index} {...instruction} />
                    }

                    return <p key={index}>{instruction}</p>
                })
            }
        </section>
        <section>
            <h3>Дополнительные материалы</h3>
            {
                drills.additional_materials.map((resource, index) => {

                    if (typeof resource === "object"){

                        return <AdvancedItem key={index} {...resource} />
                    }

                    return <p key={index}>{resource}</p>
                })
            }
        </section>
        <section>
            <h3>Дополнительные вопросы</h3>
            {
                drills.reflection_questions.map((question, index) => {
                    return <p key={index}>{question}</p>
                })
            }
        </section>
        <section>
            <h3>Заключение</h3>
            {
                drills.final_conclusion.map((conclusion, index) => {
                    return <p key={index}>{conclusion}</p>
                })
            }
        </section>
        <footer>
            <hr />
            <section>
                <div>
                    <Link to="/">К выбору упражнений</Link>
                </div>
                <div>
                    <p>
                        Книга "Разработка фронтенд-приложений"
                    </p>
                    <p>
                        Издательство "Питер", ISBN: 978-5-4461-4272-9
                    </p>
                    <p>
                        <a href='https://www.piter.com/product_by_id/1515624649'>Книга на сайте издательства</a>
                    </p>
                </div>
            </section>
        </footer>
    </main>);
};