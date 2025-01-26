package org.placement.placement.service;

import org.placement.placement.entity.Application;
import org.placement.placement.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    public Application applyForCompany(Application application) {
        return applicationRepository.save(application);
    }

    public boolean hasApplied(int studentId, int companyId) {
        return applicationRepository.existsByStudentIdAndCompanyId(studentId, companyId);
    }

    public List<Application> getApplicationsByCompanyId(int companyId) {
        return applicationRepository.findByCompanyId(companyId);
    }
}
