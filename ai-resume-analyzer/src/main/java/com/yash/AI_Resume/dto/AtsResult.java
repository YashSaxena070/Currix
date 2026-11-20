package com.yash.AI_Resume.dto;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
public class AtsResult {
    public int atsScore;
    public List<String> strengths;
    public List<String> gaps;
    public List<FixItem> fixes;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class FixItem {
        private String id;
        private String section;
        private String priority;
        private String originalText;
        private String reason;
        private String suggestedText;

        public FixItem(String simpleText) {
            this.id = UUID.randomUUID().toString();
            this.section = "Resume";
            this.priority = "Medium priority";
            this.originalText = simpleText;
            this.reason = "Optimization recommended to improve ATS ranking.";
            this.suggestedText = simpleText;
        }

        @JsonCreator
        public static FixItem fromJson(Object node) {
            if (node == null) return null;
            if (node instanceof String s) {
                return new FixItem(s);
            }
            if (node instanceof Map<?, ?> map) {
                FixItem item = new FixItem();
                item.setId(map.get("id") != null ? map.get("id").toString() : UUID.randomUUID().toString());
                item.setSection(map.get("section") != null ? map.get("section").toString() : "Resume");
                item.setPriority(map.get("priority") != null ? map.get("priority").toString() : "Medium priority");
                
                String original = map.get("originalText") != null 
                        ? map.get("originalText").toString() 
                        : (map.get("original") != null ? map.get("original").toString() : "");
                item.setOriginalText(original);

                String reason = map.get("reason") != null 
                        ? map.get("reason").toString() 
                        : (map.get("problem") != null ? map.get("problem").toString() : "");
                item.setReason(reason);

                String suggested = map.get("suggestedText") != null 
                        ? map.get("suggestedText").toString() 
                        : (map.get("suggestion") != null ? map.get("suggestion").toString() : (map.get("fix") != null ? map.get("fix").toString() : original));
                item.setSuggestedText(suggested);

                return item;
            }
            return new FixItem(node.toString());
        }
    }
}
