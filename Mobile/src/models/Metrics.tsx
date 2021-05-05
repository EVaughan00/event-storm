import React from 'react'
import Solution from './Solution'
import Template from './Template'

export default class Metrics {

    public events: number
    public completedEvents: number
    
    public tasks: number
    public completedTasks: number

    public models: number
    public completedModels: number

    public static FromSolution(solution: Solution): Metrics {

        var metrics = new Metrics()

        metrics.fillFromSolution(solution)

        return metrics
    }

    private fillFromSolution(solution: Solution): void {
        this.events = solution.events.length
        this.completedEvents = solution.completedEvents.length
        this.tasks = solution.tasks.length
        this.completedTasks = solution.completedTasks.length
        this.models = solution.models.length
        this.completedModels = solution.completedModels.length
    }


    public static FromTemplate(template: Template): Metrics {

        var metrics = new Metrics()

        metrics.fillFromTemplate(template)

        return metrics
    }

    private fillFromTemplate(template: Template): void {
        this.events = template.events.length
        this.tasks = template.tasks.length
        this.models = template.models.length
    }
}