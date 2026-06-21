package DFLA.AI_Powewred.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "forensic_cases")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ForensicCase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "case_name", nullable = false)
    private String caseName;

    @Column(name = "raw_log_data", columnDefinition = "LONGTEXT") 
    private String rawLogData;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}