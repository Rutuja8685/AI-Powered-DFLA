package DFLA.AI_Powewred.repository;

import DFLA.AI_Powewred.model.ForensicCase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ForensicCaseRepository extends JpaRepository<ForensicCase, Long> {
}