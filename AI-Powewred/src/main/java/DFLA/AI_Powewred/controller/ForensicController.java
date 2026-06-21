package DFLA.AI_Powewred.controller;

import org.springframework.ai.chat.model.ChatModel;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

import DFLA.AI_Powewred.model.ForensicCase;
import DFLA.AI_Powewred.repository.ForensicCaseRepository;

@RestController
@RequestMapping("/api/forensics")
@CrossOrigin(origins ={"http://localhost:3000", "http://localhost:3001"}) // 🌟 Now it tr
public class ForensicController {

    private final ChatModel chatModel;
    private final ForensicCaseRepository caseRepository;

    public ForensicController(ChatModel chatModel, ForensicCaseRepository caseRepository) {
        this.chatModel = chatModel;
        this.caseRepository = caseRepository;
    }

    @PostMapping("/analyze")
    public Map<String, String> analyzeLogPayload(@RequestBody Map<String, String> payload) {
        String caseName = payload.getOrDefault("caseName", "SUSPICIOUS_LOG_CASE");
        String rawLogs = payload.get("logs");
        String userQuery = payload.get("query");

        ForensicCase caseRecord = new ForensicCase();
        caseRecord.setCaseName(caseName);
        caseRecord.setRawLogData(rawLogs);
        
        caseRecord = caseRepository.save(caseRecord);

        String compiledPrompt = "You are an expert digital forensics analyst. Review these log sequences:\n" 
                + rawLogs + "\nBased on the data, answer this question clearly: " + userQuery;

        String aiResponse = chatModel.call(compiledPrompt);

        return Map.of(
            "status", "ANALYSIS_COMPLETE",
            "saved_case_id", caseRecord.getId().toString(),
            "ai_response", aiResponse
        );
    }
}