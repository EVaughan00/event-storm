import { DependencyList, useEffect, useState } from "react";
import { EventStormService } from "../services/eventStorm/EventStormService";
import { SolutionDTO } from "../services/solution/models/SolutionDTO";
import SolutionViewModel from "../services/solution/models/SolutionViewModel";
import { SolutionService } from "../services/solution/SolutionService";
import { TemplateDTO } from "../services/template/models/TemplateDTO";
import TemplateViewModel from "../services/template/models/TemplateViewModel";
import { TemplateService } from "../services/template/TemplateService";
import { FormModel } from "../utils/FormModel";

export interface Mappable extends FormModel {
    Map(): any
}

export function useTemplateMapper(callback: () => void, deps?: DependencyList) {

    const [templates, setTemplates] = useState<Array<TemplateViewModel>>([]);

    useEffect(() => {
        TemplateService.getTemplates()
          .then((data) =>
            setTemplates(
              data.model.result.map((dto) => new TemplateDTO().copy(dto).Map())
            )
          )
          .then(callback)
      }, deps);

      return templates
}

export function useSolutionMapper(callback: () => void, deps?: DependencyList) {

    const [solutions, setSolutions] = useState<Array<SolutionViewModel>>([]);

    useEffect(() => {
        SolutionService.getSolutions()
          .then((data) =>
            setSolutions(
              data.model.result.map((dto) => new SolutionDTO().copy(dto).Map())
            )
          )
          .then(callback)
      }, deps);

      return solutions
}