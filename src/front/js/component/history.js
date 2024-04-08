import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../layout";

export const History = () => {
    const { currentUser } = useContext(AppContext);
    const [completedJobs, setCompletedJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch(process.env.BACKEND_URL + `/api/worker/jobs/completed`, {
            method: "POST",
            body: JSON.stringify({ userId: currentUser.id }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then(data => {
                console.log("Completed jobs fetched:", data);
                setCompletedJobs(data);
            })
            .catch(error => console.error("Error fetching completed jobs:", error))
            .finally(() => setIsLoading(false));
    }, [currentUser.id]);

    return (
        <div>
            <h1>Completed Jobs</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {completedJobs.map((job, index) => (
                        <li key={index}>
                            <h3>{job.title}</h3>
                            <p>{job.description}</p>
                            <p>Completed on: {job.completedDate}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
