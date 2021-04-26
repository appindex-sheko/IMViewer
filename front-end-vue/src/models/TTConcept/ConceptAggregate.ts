import { ConceptChild} from "./ConceptChild";
import { Concept } from "./Concept";

export class ConceptAggregate {
  concept: Set<Concept>;
  children: [];
  parents: [];
  properties: [];
  roles: [];

  constructor(
    concept: Set<Concept>,
    children: [],
    parents: [],
    properties: [],
    roles: []
  ) {
    this.concept = concept;
    this.children = children;
    this.parents = parents;
    this.properties = properties;
    this.roles = roles;
  }
}
