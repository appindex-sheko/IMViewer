package org.endeavourhealth.imviewer.common.dal;

import com.fasterxml.jackson.databind.JsonNode;

import java.util.List;

public interface ViewerDAL {
    List<JsonNode> getAxioms(String iri) throws Exception;
}