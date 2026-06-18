package com.lab04.orchidmanagement.services;

import com.lab04.orchidmanagement.exception.OrchidNotFoundException;
import com.lab04.orchidmanagement.pojos.Orchid;
import com.lab04.orchidmanagement.repositories.IOrchidRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrchidService implements IOrchidService {

    private final IOrchidRepository repository;

    public OrchidService(IOrchidRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Orchid> getAllOrchids() {
        return repository.findAll();
    }

    @Override
    public Optional<Orchid> getOrchidById(Integer id) {
        return repository.findById(id);
    }

    @Override
    public Orchid createOrchid(Orchid orchid) {
        return repository.save(orchid);
    }

    @Override
    public Orchid updateOrchid(Integer id, Orchid orchid) {
        Orchid existing = repository.findById(id)
                .orElseThrow(() -> new OrchidNotFoundException("Orchid not found with id: " + id));
        existing.setOrchidName(orchid.getOrchidName());
        existing.setIsNatural(orchid.getIsNatural());
        existing.setOrchidDescription(orchid.getOrchidDescription());
        existing.setOrchidCategory(orchid.getOrchidCategory());
        existing.setIsAttractive(orchid.getIsAttractive());
        existing.setOrchidURL(orchid.getOrchidURL());
        return repository.save(existing);
    }

    @Override
    public void deleteOrchid(Integer id) {
        if (!repository.existsById(id)) {
            throw new OrchidNotFoundException("Orchid not found with id: " + id);
        }
        repository.deleteById(id);
    }
}
