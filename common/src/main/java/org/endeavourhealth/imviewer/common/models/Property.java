package org.endeavourhealth.imviewer.common.models;

public class Property {
    private Concept property;
    private Integer minCardinality;
    private Integer maxCardinality;
    private Concept valueType;

    public Concept getProperty() {
        return property;
    }

    public Property setProperty(Concept property) {
        this.property = property;
        return this;
    }

    public Integer getMinCardinality() {
        return minCardinality;
    }

    public Property setMinCardinality(Integer minCardinality) {
        this.minCardinality = minCardinality;
        return this;
    }

    public Integer getMaxCardinality() {
        return maxCardinality;
    }

    public Property setMaxCardinality(Integer maxCardinality) {
        this.maxCardinality = maxCardinality;
        return this;
    }

    public Concept getValueType() {
        return valueType;
    }

    public Property setValueType(Concept valueType) {
        this.valueType = valueType;
        return this;
    }
}
