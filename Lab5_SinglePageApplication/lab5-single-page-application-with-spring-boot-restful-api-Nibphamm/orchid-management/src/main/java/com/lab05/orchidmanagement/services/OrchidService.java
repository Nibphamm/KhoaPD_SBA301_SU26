package com.lab05.orchidmanagement.services;

import com.lab05.orchidmanagement.pojos.Orchid;
import com.lab05.orchidmanagement.repositories.IOrchidRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrchidService implements IOrchidService {

    @Autowired
    private IOrchidRepository orchidRepository;

    @Override
    public List<Orchid> getAllOrchids() {
        return orchidRepository.findAll();
    }

    @Override
    public Optional<Orchid> getOrchidById(Integer id) {
        return orchidRepository.findById(id);
    }

    @Override
    public Orchid createOrchid(Orchid orchid) {
        return orchidRepository.save(orchid);
    }

    @Override
    public Orchid updateOrchid(Integer id, Orchid orchid) {
        Optional<Orchid> existingOpt = orchidRepository.findById(id);
        if (existingOpt.isEmpty()) {
            return null;
        }
        Orchid existing = existingOpt.get();
        existing.setOrchidName(orchid.getOrchidName());
        existing.setIsNatural(orchid.getIsNatural());
        existing.setOrchidDescription(orchid.getOrchidDescription());
        existing.setOrchidCategory(orchid.getOrchidCategory());
        existing.setIsAttractive(orchid.getIsAttractive());
        existing.setOrchidURL(orchid.getOrchidURL());
        return orchidRepository.save(existing);
    }

    @Override
    public void deleteOrchid(Integer id) {
        orchidRepository.deleteById(id);
    }

    @Override
    public boolean existsById(Integer id) {
        return orchidRepository.existsById(id);
    }
}
